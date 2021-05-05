import React, { useState } from 'react';
import { usePutBoard } from '../../operations/mutations/putBoard';
import './index.css';
import { appStateVar } from '../../apollo/cache';

function AddBoard() {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const { putBoard, boardLoading, boardData } = usePutBoard();

    const handleAdd = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    }

    const handleSubmit = async () => {
        const result = await putBoard({
            variables: {
                "organisationId": appStateVar().orgId,
                "input": {
                    "name": name
                }  
            }
        })
        if(result.data){
            setIsEdit(false);
            setName('');
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
                    />
                    <button className='add-board-submit' onClick={handleSubmit}>
                        {boardLoading ? 'Creating' : 'Submit'}
                    </button>
                </>
            ) 
            : (<span className='add-board-plus' onClick={handleAdd}>+</span>)}
            
        </div>
    )
}

export default AddBoard;
