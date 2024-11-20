// api.service.ts
import { supabase } from '@/lib/supabaseClient'

export interface UserProps {
    id: string
    pokemon_id: string
    pseudo: string
}

export interface CardProps {
    id: string
}

export default class ApiService {
    static auth = {
        async signUp(email: string, password: string, pseudo: string) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: pseudo,
                    },
                },
            })

            if (error) {
                throw new Error(error.message)
            }

            return data.user
        },

        async addUserToDB(id: string, pseudo: string, pokemonId: string) {
            const { data, error } = await supabase.from('users').insert({
                id: id,
                pseudo: pseudo,
                pokemon_id: pokemonId,
            })
            if (error) {
                throw new Error(error.message)
            }
            return data
        },

        async login(email: string, password: string) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw new Error(error.message)
            }

            return data.user
        },
        async logout() {
            const { error } = await supabase.auth.signOut()

            if (error) {
                throw new Error(error.message)
            }
        },
    }

    static user = {
        async lookup() {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                throw new Error(error.message)
            }
            return data.user
        },
        async getUserById(userId: string): Promise<UserProps | null> {
            const { data, error } = await supabase.from('users').select('*').eq('id', userId).single() // Use .single() to fetch a single row

            if (error) {
                console.error('Error fetching user:', error)
                return null
            }
            return data as UserProps
        },
    }
}
