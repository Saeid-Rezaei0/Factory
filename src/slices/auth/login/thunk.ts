import { postFakeLogin } from "helpers/fakebackend_helper";
import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";
import { getFirebaseBackend } from "helpers/firebase_helper";

interface User {
    email: string;
    password: string;
}

export const loginUser = (
    user: User,
    history: any
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        let response: any;
        if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
            response = await postFakeLogin({
                email: user.email,
                password: user.password,
            });
            localStorage.setItem("authUser", JSON.stringify(response));
        } else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            let fireBaseBackend = await getFirebaseBackend();
            response = await fireBaseBackend.loginUser(
                user.email,
                user.password
            )
        }
        if (response) {
            dispatch(loginSuccess(response));
            history("/dashboard");
        }
    } 

    catch (error) {

        dispatch(loginError(error));
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        localStorage.removeItem("authUser");

        let fireBaseBackend = await getFirebaseBackend();
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = fireBaseBackend.logout;
            dispatch(logoutSuccess(response));
        } else {
            dispatch(logoutSuccess(true));
        }
    } catch (error) {
        dispatch(loginError(error));
    }
}


export const socialLogin = (type: any, history: any) => async (dispatch: any) => {
    try {
        let response: any;

        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const fireBaseBackend = getFirebaseBackend();
            response = fireBaseBackend.socialLoginUser(type);
        }

        const socialData = await response;

        if (socialData) {
            sessionStorage.setItem("authUser", JSON.stringify(socialData));
            dispatch(loginSuccess(socialData));
            history('/dashboard');
        }

    } catch (error) {
        dispatch(loginError(error));
    }
}


// کد اصلی  
// کد های من 





// تست سوم



// import { postFakeLogin } from "helpers/fakebackend_helper";  // در صورت نیاز به fake login
// import { loginError, loginSuccess, logoutSuccess } from "./reducer";
// import { ThunkAction } from "redux-thunk";
// import { Action, Dispatch } from "redux";
// import { RootState } from "slices";

// // مسیر API خود را اینجا قرار دهید
// const apiUrl = "https://your-api-endpoint.com/login"; // مسیر صحیح API خود را وارد کنید

// interface User {
//     email: string;
//     password: string;
// }

// export const loginUser = (
//     user: User,
//     history: any
// ): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
//     try {
//         let response: any;
//         // ارسال درخواست به API خود به جای Firebase
//         if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//             // اگر از Fake Backend استفاده می‌کنید
//             response = await postFakeLogin({
//                 email: user.email,
//                 password: user.password,
//             });
//             localStorage.setItem("authUser", JSON.stringify(response));  // ذخیره اطلاعات ورود در localStorage
//         } else if (process.env.REACT_APP_DEFAULTAUTH === "custom-api") {
//             // ارسال درخواست به API شخصی شما
//             const response = await fetch(apiUrl, {
//                 method: "POST", // استفاده از متد POST
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: user.email,
//                     password: user.password,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Login failed");
//             }

//             const data = await response.json();

//             // ذخیره توکن در localStorage
//             localStorage.setItem("authToken", data.token);

//             // ذخیره اطلاعات کاربر در localStorage
//             localStorage.setItem("authUser", JSON.stringify(data.user));
//         }

//         // اگر پاسخ موفق بود، وضعیت ورود کاربر را تغییر دهید
//         dispatch(loginSuccess(response));
//         history("/dashboard"); // هدایت به داشبورد

//     } catch (error) {
//         dispatch(loginError(error));  // نمایش خطا در صورت بروز مشکل
//     }
// };

// export const logoutUser = () => async (dispatch: Dispatch) => {
//     try {
//         localStorage.removeItem("authUser");
//         localStorage.removeItem("authToken"); // حذف توکن هنگام خروج
//         dispatch(logoutSuccess(true));  // وضعیت logout را به true تغییر دهید
//     } catch (error) {
//         dispatch(loginError(error));  // نمایش خطا در صورت بروز مشکل
//     }
// };

// استفاده از سوشال

// export const socialLogin = (type: any, history: any) => async (dispatch: any) => {
//     try {
//         let response: any;

//         // در صورت نیاز به ورود اجتماعی (مثلاً Google یا Facebook)
//         if (process.env.REACT_APP_DEFAULTAUTH === "custom-api") {
//             const response = await fetch(`${apiUrl}/social-login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ type }), // اطلاعات ورود اجتماعی
//             });

//             const socialData = await response.json();

//             if (socialData) {
//                 sessionStorage.setItem("authUser", JSON.stringify(socialData));
//                 dispatch(loginSuccess(socialData));
//                 history("/dashboard");
//             }
//         }

//     } catch (error) {
//         dispatch(loginError(error));
//     }
// };





// try من 
// try {
//     // ارسال درخواست به سرور شما با استفاده از axios
//     const response = await axios.post("https://your-server-url/api/login", {
//         email: user.email,
//         password: user.password,
//     });

//     // بررسی وجود توکن در پاسخ سرور
//     if (response.data.token) {
//         // ذخیره توکن در localStorage
//         localStorage.setItem("authToken", response.data.token);

//         // Dispatch موفقیت
//         dispatch(loginSuccess(response.data));

//         // هدایت به داشبورد
//         history("/dashboard");
//     } else {
//         throw new Error("Token not found in response!");
//     }