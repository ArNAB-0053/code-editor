export const passwordRules = (password: string) => ({
  length: password.length >= 8,
  lowercase: /[a-z]/.test(password),
  uppercase: /[A-Z]/.test(password),
  number: /\d/.test(password),
  special: /[!@#$%^&*()_+\-=\[\]{};:'",.<>\?\/\\]/.test(password),
  noRepeat: !/(.)\1{3,}/.test(password),
});

export const usernameRules = (username: string) => ({
  minLength: username.length >= 3,
  maxLength: username.length < 18,
  lowercase: /^[a-z]/.test(username),
  special: /^[a-z0-9_]+$/.test(username),
});

export const getPasswordError = (password: string) => {
  if (password.length < 8)
    return "Password must be at least 8 characters long";

  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";

  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";

  if (!/\d/.test(password))
    return "Password must contain at least one digit";

  if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>\?\/\\]/.test(password))
    return "Password must contain at least one special character";

  if (/(.)\1{3,}/.test(password))
    return "Password cannot contain 4 identical characters in a row";

  return null; 
};

export const getUsernameError = (username: string) => {
  if (username.length < 3)
    return "Username must be at least 3 characters long";

  if (!/^[a-z]/.test(username))
    return "Username must start with a lowercase letter";

  if (!/^[a-z0-9_]+$/.test(username))
    return "Username can only contain lowercase letters, numbers, and underscores";

  if (username.length > 18)
    return "Username cannot be more than 18 characters";

  return null;
};

