'use client';

import {ChevronLeft, ChevronRight} from 'lucide-react';
import Image from 'next/image';
import 'swiper/css';
import {A11y, Autoplay, Keyboard, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import {useId, useState} from 'react';
import {cn} from '@nextui-org/react';

export default function CarouselWidget() {
    const items = [
        'https://images.unsplash.com/photo-1614586125858-e695dd97d1b6?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1621587144649-ea11e0165fd2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const id = useId().replaceAll(':', '');
    const [ready, setReady] = useState(false);

    return (
        <>
            <div className='w-full py-6'>
                <Swiper
                    onInit={() => setReady(true)}
                    modules={[Autoplay, Pagination, Navigation, A11y, Keyboard]}
                    spaceBetween={20}
                    keyboard={{
                        enabled: true,
                    }}
                    navigation={{
                        nextEl: '#swiper-button-next',
                        prevEl: '#swiper-button-prev',
                    }}
                    pagination={{
                        clickable: true,
                        el: `#swiper-pagination-${id}`,
                        renderBullet(i, className) {
                            return `<button class="${className} aria-[current]:bg-primary w-2 h-2 bg-zinc-400/50 inline-block rounded-full"><span class="sr-only">Slide to ${i}</span></button>`;
                        },
                    }}
                    slidesPerView={1.5}
                    autoplay={{
                        pauseOnMouseEnter: true,
                    }}
                    loop
                    centeredSlides={true}
                    className={cn('relative ', !ready && 'opacity-0')}>
                    {items.map((image, i) => (
                        <SwiperSlide
                            key={`slide-${i}`}
                            className='relative aspect-video overflow-hidden rounded-lg border shadow'>
                            <Image
                                className='object-cover'
                                fill
                                src={image}
                                sizes='265px'
                                key={`slide-${i + 1}`}
                                alt=''
                            />
                        </SwiperSlide>
                    ))}

                    <button
                        id='swiper-button-prev'
                        className='absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-content-center'>
                        <ChevronLeft size={32} />
                        <span className='sr-only'>Prev</span>
                    </button>
                    <button
                        id='swiper-button-next'
                        className='absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-content-center'>
                        <ChevronRight size={32} />
                        <span className='sr-only'>Next</span>
                    </button>
                </Swiper>

                <div
                    id={`swiper-pagination-${id}`}
                    className='swiper-pagination mt-4 flex items-center justify-center gap-2'
                />
            </div>
        </>
    );
}
