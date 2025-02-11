import supabase from "./supabase";

export async function login({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log(error);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function signUp({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
