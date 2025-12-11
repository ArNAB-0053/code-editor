export const messagesConfig = {
    LOGIN: {
        SUCCESS: "Logged in successfully!",
        ERROR: "Login failed. Please check your credentials.",
        LOADING: "Logging you in..."
    },
    SIGN_UP: {
        SUCCESS: "Account created successfully!",
        ERROR: "Sign-up failed. Please try again.",
        EMAIL_EXISTS: "An account with this email already exists.",
        WEAK_PASSWORD: "Password is too weak. Please choose a stronger one.",
        INVALID_DATA: "Invalid data provided. Please check your details.",
        LOADING: "Creating your account..."
    },
    LOGOUT: {
        SUCCESS: "Logged out successfully!",
        LOADING: "Logging you out..."
    },
    PROFILE: {
        UPDATE_SUCCESS: "Profile updated successfully!",
        UPDATE_ERROR: "Failed to update profile.",
        LOADING: "Updating your profile..."
    },
    COMMON: {
        SERVER_ERROR: "Something went wrong. Please try again later.",
        UNAUTHORIZED: "You are not authorized to perform this action.",
        LOADING: "Please wait..."
    },
    AUTOSAVE: {
        LOADING : "Saving ...",
        SUCCESS: "Saved",
        FAILED: "Autosave failed. Please check your connection."
    },
    AVAILABILITY_CHECKS: {
        USERNAME: {
            TRUE: "This username is available.",
            FALSE: "This username is already taken."
        },
        EMAIL: {
            TRUE: "This email address is available.",
            FALSE: "This email address is already in use."
        }
    }
};
