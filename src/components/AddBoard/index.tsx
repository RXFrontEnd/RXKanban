import React, { KeyboardEvent, useState } from 'react';
import './index.css';

export type AddBoardProps = {
    doCreateBoard: (name: string) => Promise<string>;
}

function AddBoard({doCreateBoard}: AddBoardProps) {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const handleAdd = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    }

    const handleClickForSubmit = async () => {
        if(!name){
            alert('name cannot be empty');
            return;
        }
        const error = await doCreateBoard(name);
        if(!error){
            setIsEdit(false);
            setName('');
        }
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLTextAreaElement>)=>{
        e.stopPropagation();
		if (e.key === 'Enter') {
			handleClickForSubmit();
		}
	}

    return (
        <div className='add-board-container'>
            {isEdit ? 
            (
                <>
                    <span className='add-board-close' onClick={handleClose}>X</span>
                    <textarea 
                        className='add-board-name' 
                        placeholder="Board Name"
                        
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setName(e.target.value);
                        }} 
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        className='add-board-submit' 
                        onClick={handleClickForSubmit}>
                        Submit
                    </button>
                </>
            ) 
            : (<span className='add-board-plus' onClick={handleAdd}>+</span>)}
            
        </div>
    )
}

export default AddBoard;
