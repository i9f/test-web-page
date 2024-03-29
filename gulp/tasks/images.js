import gulp from 'gulp';
import { paths } from '../config/path.js';
import gulpPlumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import newer from 'gulp-newer'; 
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import gulpMode from 'gulp-mode';

const mode = gulpMode();
const { src, dest } = gulp;

export function images() {
    return src(paths.src.img)
        .pipe(
            gulpPlumber(
                notify.onError({
                    title: 'IMAGES',
                    message: 'Error: <%= error.message %>',
                })
            )
        )
        .pipe(newer(paths.dist.img)) 
        .pipe((webp()))
        .pipe(dest(paths.dist.img))
        .pipe(src(paths.src.img))
        .pipe(newer(paths.dist.img))
        .pipe(mode.production(imagemin()))
        .pipe(dest(paths.dist.img))
        .pipe(browserSync.stream());
}