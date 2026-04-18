import { apiLogin } from "@/services/api/apiAuth";
import { AuthStateConfig } from "@/types/config";
import { ResponseLogin } from "@/types/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState: AuthStateConfig = {
    isLoggedIn: false,
    token: null,
    message: '',
    userId: null
}

export const loginUser = createAsyncThunk<
    string,
    { phone: string; password: string },
    { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const responsive = await apiLogin(credentials) as ResponseLogin;
        if (responsive?.data?.error === 0 && responsive?.data?.access_token) {
            const token = responsive?.data?.access_token;
            localStorage.setItem("auth", JSON.stringify({ token, isLoggedIn: true }));
            return token;
        } else {
            return rejectWithValue("Login failed");
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return rejectWithValue("Network error");
    }
});


export const getUserCurrent = createAsyncThunk<
    string,
    void,
    { rejectValue: string }
>("auth/getCurrentUser", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.SERVER_URL}/api/auth/get-user`,{
            method:"GET",
            
        });

        const data = await response?.json();
        console.log(data)
        if (data?.error === 0 && data?.data?.codeuser) {
            const codeUser = data?.data?.codeuser;
            localStorage.setItem("code", JSON.stringify({ code: codeUser }));
            return codeUser;
        } else {
            return rejectWithValue("Failed to fetch user data");
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return rejectWithValue("Network error");
    }
});

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            localStorage.setItem("auth", JSON.stringify({ token: null, isLoggedIn: false }));
            Cookies.remove("code");
        },
        addCodeUser(state, action) {

            state.message = 'Save codeuser success'
            document.cookie = `code=${action.payload};path=/`
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.message = 'Logined'
                state.token = action.payload;
            })
            .addCase(getUserCurrent.fulfilled, (state, action) => {
                state.userId = action.payload;
                state.message = 'Get user code success'
            })

    }
})

export const { logout,addCodeUser } = AuthSlice.actions;

export default AuthSlice.reducer;