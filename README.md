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
- composer install / composer install --ignore-platform-reqs
- cp .env.example .env
- php artisan key:generate
- php artisan migrate



FOR EXCEL IMPORT/EXPORT
NOTE: uncomment out extension=gd in your php.ini file for this to work
- composer require maatwebsite/excel --with-all-dependencies
  



