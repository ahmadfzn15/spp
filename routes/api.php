<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SppController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\HistoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('api.siswa')->group(function () {
    Route::controller(BillingController::class)->group(function () {
        Route::get('/tagihan', 'get');
    });
    Route::controller(SppController::class)->group(function () {
        Route::post('/spp/bayar', "bayar");
    });
    Route::controller(HistoryController::class)->group(function () {
        Route::post('/history', "get");
        Route::get('/history/test', "test");
    });
});

Route::middleware('api.admin')->group(function () {
    Route::controller(StudentController::class)->group(function () {
        Route::get('/siswa', 'get');
        Route::post('/siswa', "delete");
        Route::post('/siswa/add', "store");
        Route::put('/siswa/{id}/edit', "update")->name("update.siswa");
        Route::get('/siswa/download/json', "downloadJson");
        Route::get('/siswa/download/pdf', "downloadPdf");
        Route::get('/siswa/download/excel', "downloadExcel");
    });

    Route::controller(SppController::class)->group(function () {
        Route::get('/spp', 'get');
        Route::post('/spp/confirm', "confirm");
    });

    Route::controller(PaymentController::class)->group(function () {
        Route::get('/pembayaran', 'get');
        Route::post('/pembayaran/confirm', "confirm");
        Route::get('/pembayaran/belum-lunas', "belumLunas");
    });

    Route::controller(SettingController::class)->group(function () {
        Route::get('/setting', 'get');
        Route::put('/setting', 'edit');
    });

    Route::controller(PeriodController::class)->group(function () {
        Route::get('/periode', 'get');
        Route::post('/periode', "store");
        Route::delete('/periode/{id}', "delete");
    });

    Route::controller(ClassController::class)->group(function () {
        Route::get('/kelas', 'get');
        Route::post('/kelas', "store");
        Route::delete('/kelas/{id}', "delete");
    });
});
