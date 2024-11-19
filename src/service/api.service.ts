// api.service.ts
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/stores/user";

export default class ApiService {
    static auth = {
        async signUp(email: string, password: string, pseudo: string) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: pseudo
                    }
                }
            });

            if (error) {
                throw new Error(error.message);
            }

            return data.user;
        },

        async addUserToDB(id: string, pseudo: string, pokemonId: string) {
            const { data, error } = await supabase.from('users').insert({
                id: id,
                pseudo: pseudo,
                pokemon_id: pokemonId
            })
            if (error) {
                throw new Error(error.message);
            }
            return data
        },

        async login(email: string, password: string) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw new Error(error.message);
            }
            if (data) {
                if (data.user) {
                    const userStore = useUserStore()
                    try {
                        userStore.setUser(data.user)
                    } catch (err) {
                        console.error(err);
                    }
                }
                localStorage.setItem('access_token', JSON.stringify(data.session.access_token));
            }
            return data.user;
        },
    };

    static user = {
        async lookup() {

        }
    }
}
