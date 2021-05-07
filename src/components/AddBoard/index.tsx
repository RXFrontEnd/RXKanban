import React, { useState } from 'react';
import './index.css';
import { FetchResult } from '@apollo/client';
import { Mutations } from '../../models/type';

export type AddBoardProps = {
    handleSubmit: (name:string) => Promise<FetchResult<Mutations, Record<string, any>, Record<string, any>>>
}

function AddBoard(props: AddBoardProps) {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const handleAdd = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    }

    const handleClickForSubmit = async () => {
        const result = await props.handleSubmit(name);

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
                    <button className='add-board-submit' onClick={handleClickForSubmit}>
                        Submit
                    </button>
                </>
            ) 
            : (<span className='add-board-plus' onClick={handleAdd}>+</span>)}
            
        </div>
    )
}

export default AddBoard;
