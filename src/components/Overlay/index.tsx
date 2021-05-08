import './index.css';

interface OverlayProps {
    message: string;
    bgColor?: string;
    textColor?: string;
}
function Overlay(props: OverlayProps) {
    return (
        <div className='overlay' style={{backgroundColor: props.bgColor, color: props.textColor}}>
            {props.message}
        </div>
    )
}

export default Overlay;
