<?php

use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\KwitansiController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SppController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::controller(PagesController::class)->group(function () {
        Route::get('/', 'DashboardAdmin')->name("dashboard");
        Route::get('/help', 'Help')->name('help');
        Route::get('/setting', 'Setting')->name('setting');
    });

    Route::controller(KwitansiController::class)->group(function () {
        Route::get('/history/kwitansi/{id}/cetak', 'Kwitansi')->name("kwitansi.cetak");
        Route::get('/history/kwitansi/{id}', 'index')->name("kwitansi");
    });

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', "index")->name("profile");
        Route::get('/profile/changePassword', "change")->name("profile.change");
    });

    Route::resource("/history", HistoryController::class);
    Route::post('/profile/changePassword', [PasswordController::class, "update"])->name("profile.changePassword");
});

Route::middleware(['siswa'])->group(function () {
    Route::resource("/tagihan", BillingController::class);
});

Route::middleware(['admin'])->group(function () {
    Route::controller(PagesController::class)->group(function () {
        Route::get('/tabungan', 'Tabungan')->name('tabungan');
    });

    Route::controller(StudentController::class)->group(function () {
        Route::get('/siswa/{id}', 'show')->name('siswa.detail');
    });

    Route::resource("/pembayaran", PaymentController::class);
    Route::resource("/siswa", StudentController::class);
    Route::resource("/spp", SppController::class)->only("index");
    Route::resource("/periode", PeriodController::class)->only("index");
    Route::resource("/kelas", ClassController::class)->only("index");

    Route::controller(PrintController::class)->group(function () {
        Route::get('/print-siswa', "report")->name("report.siswa");
    });
});

require __DIR__ . '/auth.php';
