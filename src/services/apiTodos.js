import supabase from "./supabase";

export async function apiGetTodos() {
  try {
    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }
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
