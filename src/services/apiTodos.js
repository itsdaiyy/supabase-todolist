import supabase from "./supabase";

export async function getTodos() {
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

export async function createTodo(newTodo) {
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

export async function updateTodo(todo, id) {
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
