import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { Action, Dispatch } from "redux";
import { postFakeRegister } from "helpers/fakebackend_helper";
import { registerFailed, registerSuccess, resetRegister } from "./reducer";
import { getFirebaseBackend } from "helpers/firebase_helper";

interface User {
    email: string;
    username: string;
    password: string;
}

export const registerUser = (user: User
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        let response: any;
        if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
            response = await postFakeRegister(user);
        } else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            
            // initialize relevant method of both Auth
            const fireBaseBackend = getFirebaseBackend();

            response = fireBaseBackend.registerUser(user.email, user.password);
        }
        if (response) {
            dispatch(registerSuccess(response));
        }
    } catch (error) {
        dispatch(registerFailed(error));
    }
};

export const resetRegisterFlag = () => {
    try {
        const response = resetRegister(false);
        return response;
    } catch (error) {
        return error;
    }
};




// تست یک 

// import { ThunkAction } from "redux-thunk";
// import { RootState } from "slices";
// import { Action, Dispatch } from "redux";
// import axios from "axios";  // اضافه کردن axios برای ارسال درخواست‌ها
// import { registerFailed, registerSuccess, resetRegister } from "./reducer";

// // مسیر API شخصی شما
// const apiUrl = "https://saeid-test.com/register"; // مسیر دقیق API خود را وارد کنید

// interface User {
//     email: string;
//     username: string;
//     password: string;
// }

// export const registerUser = (
//     user: User
// ): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
//     try {
//         console.log("Attempting to register user:", user); // لاگ اطلاعات کاربر

//         // ارسال درخواست ثبت‌نام به API شخصی
//         const response = await axios.post(apiUrl, {
//             email: user.email,
//             username: user.username,
//             password: user.password,
//         });

//         console.log("Registration response:", response); // لاگ پاسخ دریافتی از API

//         // بررسی پاسخ و dispatch موفقیت
//         if (response.data) {
//             dispatch(registerSuccess(response.data));  // اگر پاسخ موفق بود، داده‌ها را به ری‌داکس ارسال می‌کنیم
//         }
//     } catch (error) {
//         console.error("Registration error:", error); // لاگ خطا در صورت بروز مشکل
//         dispatch(registerFailed(error)); // اگر خطا رخ داد، خطا را به ری‌داکس ارسال می‌کنیم
//     }
// };

// export const resetRegisterFlag = () => {
//     try {
//         const response = resetRegister(false);  // ریست وضعیت ثبت‌نام
//         return response;
//     } catch (error) {
//         console.error("Error resetting register flag:", error); // لاگ خطا در صورت بروز مشکل
//         return error;
//     }
// };
