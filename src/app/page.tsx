'use client';

import {Card, CardBody} from '@nextui-org/card';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Page() {
    const router: AppRouterInstance = useRouter();

    return (
        <div className='grid grid-cols-1 gap-4 p-4'>
            <Card
                onClick={() => {
                    router.push('/three-fiber');
                }}
                isPressable>
                <CardBody>
                    <h2>Three Fiber</h2>
                    <p>Three Fiber を使ってた。ブロックを描写</p>
                </CardBody>
            </Card>
            <Card
                onClick={() => {
                    router.push('/carousel');
                }}
                isPressable>
                <CardBody>
                    <h2>Carousel</h2>
                    <p>カルーセルを作ってみた</p>
                </CardBody>
            </Card>
            <Card
                onClick={() => {
                    router.push('/robots');
                }}
                isPressable>
                <CardBody>
                    <h2>Robots</h2>
                    <p>ロボットを描写</p>
                </CardBody>
            </Card>
        </div>
    );
}
