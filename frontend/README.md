GitHub OAuth

   ↓
   
NextAuth session created

   ↓
   
Backend API: TempUserBB

   ↓
   
User inserted into TempUserBB(email, github-username, provider, providerId)

   ↓
   
JWT issued

   ↓
   
Modal shown

   ↓
   
CompleteSignupForm submitted

   ↓
   
User updated the details(username, name) -> username ≠ github-username

   ↓
   
Backend API: FindOrCreateOAuthUser

   ↓
   
Saved into main user-db

   ↓
   
From TempUserDB deleted

