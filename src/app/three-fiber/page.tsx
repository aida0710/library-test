import {ThreeFiber} from '@/components/three-fiber';

export default function Page() {
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <div className='h-full w-full'>
                <ThreeFiber />
            </div>
        </div>
    );
}
