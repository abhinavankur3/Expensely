export const createExpense = async (pb, expenseData) => {
  try {
    if (!pb?.authStore?.record?.id) {
      throw new Error("User not authenticated");
    }

    const data = {
      ...expenseData,
      userId: pb.authStore.record.id,
    };

    const record = await pb.collection("expenses").create(data);
    return record;
  } catch (error) {
    console.error("Error creating expense:", error);
    if (error.response) {
      // Handle PocketBase specific errors
      const { code, message } = error.response;
      throw new Error(`Failed to create expense: ${message} (${code})`);
    }
    throw error;
  }
};

export const getRecentExpenses = async (pb, options = {}) => {
  try {
    if (!pb?.authStore?.record?.id) {
      throw new Error("User not authenticated");
    }
    const records = await pb.collection("expenses").getList(1, 6, {
      filter: `userId = "${pb.authStore.record.id}"`,
      sort: "-amount",
      requestKey: "getRecentExpenses",
      ...options,
    });
    return records;
  } catch (error) {
    if (error.isAbort) {
      throw new DOMException("Request was aborted", "AbortError");
    }
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const getExpenses = async (pb, options = {}, isSummary = true) => {
  try {
    if (!pb?.authStore?.record?.id) {
      throw new Error("User not authenticated");
    }

    const userId = pb.authStore.record.id;
    const filter = `userId = "${userId}"`;

    // Get all expenses (you might want to add pagination if the list is large)
    const expenses = await pb.collection("expenses").getFullList({
      filter,
      sort: "-expenseDate",
      ...options,
    });

    if (!isSummary) {
      return expenses;
    }
    // Calculate sums on the client side
    const summary = expenses.reduce(
      (acc, expense) => {
        const amount = parseFloat(expense.amount) || 0;
        acc.totalExpenses += amount;

        if (expense.type === "fixed") {
          acc.fixedExpenses += amount;
        } else if (expense.type === "variable") {
          acc.variableExpenses += amount;
        }

        return acc;
      },
      {
        totalExpenses: 0,
        fixedExpenses: 0,
        variableExpenses: 0,
      }
    );
    return {
      ...summary,
      remaining: (pb.authStore.record.income - summary.totalExpenses).toFixed(
        2
      ),
      income: pb.authStore.record.income,
    };
  } catch (error) {
    console.error("Error fetching expense summary:", error);
    throw error;
  }
};
