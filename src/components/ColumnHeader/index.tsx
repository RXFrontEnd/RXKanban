import './index.css';

interface ColumnHeaderProps {
    title: string;
    showAll: boolean;
    handleChange: () => void;
}

function ColumnHeader({title, showAll, handleChange}: ColumnHeaderProps) {
    return (
        <div className='column-header-container'>
            <h3 className='column-title'>{title}</h3>
            <div className='column-showall-container'>
                <input 
                    className='column-showall' 
                    type='checkbox'
                    id='all'
                    checked={showAll}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange();
                    }}/>
                <label className='column-showall-label' htmlFor='all'>All</label>
            </div>
            
        </div>
    )
}

export default ColumnHeader;
