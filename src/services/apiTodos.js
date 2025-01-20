import supabase from "./supabase";

export async function apiGetTodos() {
  try {
    // const {
    //   data: { session },
    //   error: sessionError,
    // } = await supabase.auth.getSession();

    // if (sessionError) throw sessionError;

    // if (!session) {
    //   console.log("No user logged in");
    //   return [];
    // }

    // const userId = session.user.id;

    const { data: todos, error: todosError } = await supabase
      .from("todos")
      .select("*");
    // .eq("user_id", userId)
    // .order("id", { ascending: true });

    if (todosError) throw todosError;
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
}

export async function apiCreateTodo(newTodo) {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert([newTodo])
      .select();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
}

export async function apiUpdateTodo(todo, id) {
  try {
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq("id", Number(id))
      .select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
}

export async function apiDeleteTodo(id) {
  try {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", Number(id));
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting todos:", error);
    return null;
  }
}
