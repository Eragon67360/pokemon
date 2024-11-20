// api.service.ts
import { supabase } from '@/lib/supabaseClient'
import axios from '@/config/axiosConfig'

export interface UserProps {
    id: string
    pokemon_id: string
    pseudo: string
}
export interface CardProps {
    id: string
    name: string
}
export interface CardsApiProps {
    data: CardProps[]
    page: number
    pageSize: number
    count: number
    totalCount: number

}

export default class ApiService {
    static BASE_URL = import.meta.env.VITE_POKEMON_TVG_API_BASE_URL
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

    static card = {
        async getAll() {
            const { data } = await axios.get<CardsApiProps>('/cards');
            return data
        },
    }
}
