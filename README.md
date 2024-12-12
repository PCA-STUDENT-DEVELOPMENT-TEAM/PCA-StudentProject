INSTALLATION INSTRUCTIONS :



ADD THE DEPENDENCIES :
- Node.js
- Composer
- XAMPP or Laragon (Optional)


FRONT END
- npm install
- npm install @tanstack/react-table
- npm install @radix-ui/react-avatar
- npm install --save-dev tailwind-scrollbar
- npm install @radix-ui/react-switch


BACK END
- composer install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate

NOTE:

FOR Members that were added before 23/10/2024 . Run git remote set-url origin https://github.com/jlibdev/PCA-StudentProject.git before starting.
Repo has been renamed
CHARLS


FRONTEND COMPONENTS NOTES:
================================================================


<DatePicker></DatePicker>
================================================================
Specific Date Picker
Props : date , setDate => Type React.useState<Date>()

Sample Use:

const {enddate,  setEndDate} = React.useState<Date>()
<DatePicker date={enddate} setDate={setEndDate} />
===============================================================


