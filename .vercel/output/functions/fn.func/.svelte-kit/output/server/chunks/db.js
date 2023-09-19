import { createClient, FunctionsHttpError } from "@supabase/supabase-js";
import { j as get_store_value } from "./index2.js";
import { b as bookmarkStore, d as currentStore, p as paygateStore, f as addToast, u as userStore, e as planStore } from "./store.js";
import mixpanel from "mixpanel-browser";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
const PUBLIC_STORAGE_URL = "https://paddechpmdutxepollwl.supabase.co/storage/v1/object/public/audio/";
const PUBLIC_SUPABASE_URL = "https://paddechpmdutxepollwl.supabase.co";
const PUBLIC_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZGRlY2hwbWR1dHhlcG9sbHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3NDc5ODUsImV4cCI6MTk5NTMyMzk4NX0.2lKbkhSTUX7Dy8ebcpu8lLSv4WRQV864JWgCJkI6Hok";
const PUBLIC_MIXPANEL_KEY = "aecee2d65bbb1602bee4f8b5f3c73567";
const PUBLIC_TITLE = "My Queue";
const PUBLIC_STRIPE_CUSTOMER_PORTAL = "https://billing.stripe.com/p/login/fZecNOgHY2sB5pu9AA";
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
const db = {
  async signInWithApple() {
    await supabase.auth.signInWithOAuth({
      provider: "apple"
    });
  },
  async signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    });
  },
  async signUp(email, password) {
    const res = await supabase.auth.signUp({
      email,
      password
    });
    return res;
  },
  async signIn(email, password) {
    const res = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return res;
  },
  async deleteAccount() {
    const user = get_store_value(userStore);
    if (!user) {
      return;
    }
    await supabase.functions.invoke("delete-user", {
      body: {
        id: user.id
      }
    });
  },
  async signOut() {
    await supabase.auth.signOut();
  },
  bookmarks: {
    async get() {
      const { data } = await supabase.from("bookmarks").select("*").order("created_at", { ascending: false });
      bookmarkStore.set(data);
      if (data && data.length > 0) {
        currentStore.update((v) => data[0]);
      }
    },
    async addBookmark(bookmark) {
      const user = get_store_value(userStore);
      try {
        const { data, error } = await supabase.from("bookmarks").insert({ ...bookmark, user_id: user?.id }).select();
        if (data) {
          bookmarkStore.update((v) => {
            const currentValue = v ? v : [];
            return [data[0], ...currentValue];
          });
        }
      } catch (e) {
      }
    },
    async remove(bookmark) {
      const user = get_store_value(userStore);
      if (!user) {
        return;
      }
      try {
        const fileRes = await supabase.storage.from("audio").remove([`${user.id}/${bookmark.id}.mp3`]);
        const res = await supabase.from("bookmarks").delete().eq("id", bookmark.id);
        bookmarkStore.update((v) => {
          if (!v) {
            return [];
          }
          const filteredBookmarks = v?.filter((b) => b.id !== bookmark.id);
          const currentlySelected = get_store_value(currentStore);
          if (filteredBookmarks.length > 0 && currentlySelected?.id == bookmark.id) {
            currentStore.update((v2) => filteredBookmarks[0]);
          }
          return filteredBookmarks;
        });
        mixpanel.track("aticle removed");
      } catch {
        addToast({ type: "error", content: "Uh oh, something went wrong!" });
      }
    },
    async post(url) {
      const user = get_store_value(userStore);
      const res = await supabase.functions.invoke("parse", {
        body: { user_id: user?.id, url }
      });
      const { data, error } = res;
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        if (errorMessage.error == "TOO_MANY_ARTICLES") {
          mixpanel.track("article limit hit", { response: url });
          paygateStore.set("article-limit");
          return;
        }
      }
      if (data) {
        bookmarkStore.update((v) => {
          const currentValue = v ? v : [];
          return [data, ...currentValue];
        });
        addToast({
          content: "Successfully added to queue",
          type: "success"
        });
        mixpanel.track("url added succesfully", { response: url });
        return { data, error };
      } else {
        mixpanel.track("url failed", { url });
        addToast({
          content: "Oops, that did not work, maybe we cannnot read the article",
          type: "error"
        });
        return false;
      }
    }
  },
  tts: {
    async create(bookmark) {
      const { data, error } = await supabase.functions.invoke("tts", {
        body: bookmark
      });
      return { data, error };
    }
  },
  discovery: {
    async get(source) {
      const { data, error } = await supabase.from("discovery").select().eq("publisher", source);
      return data;
    }
  },
  billing: {
    async createCustomerId() {
      const user = get_store_value(userStore);
      if (!user) {
        return;
      }
      const { data, error } = await supabase.functions.invoke("stripe-create-checkout", {
        body: {
          type: "create_stripe_checkout",
          id: user.id,
          email: user.email
        }
      });
      if (Capacitor.getPlatform() !== "native") {
        await Browser.open({ url: data.url });
      } else {
        window.open(data.url);
      }
    },
    async getUserPlan() {
      const user = get_store_value(userStore);
      if (!user) {
        return;
      }
      const { data, error } = await supabase.from("profiles").select().eq("id", user.id);
      if (data[0] && data[0].plan) {
        planStore.set(data[0].plan);
      }
    }
  }
};
export {
  PUBLIC_MIXPANEL_KEY as P,
  PUBLIC_TITLE as a,
  PUBLIC_STORAGE_URL as b,
  PUBLIC_STRIPE_CUSTOMER_PORTAL as c,
  db as d
};
