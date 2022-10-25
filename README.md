## Backend Developer Interview

This web app stores user input on Supabase and display using Next.js. The app is currently deployed on Vercel.

[Test deployment](https://bdi-b23lo55g4-hiphophammer.vercel.app/)
Note: the data will be displayed upon click of submission button

## Build Instructions

Vercel:

Upon linking a GitHub repository and Vercel project, Vercel will automatically build the latest push.
Some of the settings are as follows:
  Build command: npm run build
  Output directory: default (Next.js default)
  Install command: npm install
  
  Function Region: San Francisco - 1
  
  Environment varialbes:
    NEXT_PUBLIC_SUPABASE_URL: https://mmzgaecsvpwftbkzduij.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1temdhZWNzdnB3ZnRia3pkdWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzOTkyNTIsImV4cCI6MTk4MTk3NTI1Mn0.mndz0n2wIY9dwLTl_TUuf7RS7zV4wvkHfDdxCinwXW4
    
![image](https://user-images.githubusercontent.com/83526924/197665727-f5419a1c-d5f3-4c34-959b-73de19fa5c06.png)

Upon a successful build attempt, you will be redirected to this page:
The project can be accessed via URL on the dashboard:
![image](https://user-images.githubusercontent.com/83526924/197666060-95aee577-4b02-4e88-8852-3832b76366a9.png)
