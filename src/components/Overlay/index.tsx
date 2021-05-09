import './index.css';

interface OverlayProps {
    message: string;
    bgColor?: string;
    textColor?: string;
}
function Overlay(props: OverlayProps) {
    return (
        <div className='overlay' style={{backgroundColor: props.bgColor, color: props.textColor}}>
            <p>{props.message}</p>
            
        </div>
    )
}

export default Overlay;
