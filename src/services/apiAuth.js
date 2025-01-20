import supabase from "./supabase";

export async function logIn({ email, password }) {
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
      return { error: `取得 session 失敗` };
    }
    return { data, error };
  } catch (error) {
    console.log(error);
    return { error: `取得 session 失敗` };
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError);
      return;
    }
    return { user, isAuthenticated: user?.role === "authenticated" };
  } catch (error) {
    console.log(error);
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
