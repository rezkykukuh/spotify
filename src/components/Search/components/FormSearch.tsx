import * as React from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const InputSearch = styled(TextField)`
    background-color: #fff;
    margin-left: 140px;
`;

const ButtonSearch = styled(Button)`
    background-color: rgb(201, 0, 50);
    color: white;
    text-transform: none;
    :hover {
        background-color: rgb(138, 1, 1);
    }
`;

const ButtonReset = styled(Button)`
    background-color: rgb(228, 228, 228);
    color: rgb(48, 48, 48);
    text-transform: none;
    :hover {
        background-color: rgb(243, 242, 242);
    }
`;

interface IFSProps {
    onSearch: () => void;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSearch:React.FC<IFSProps> = ({ onChange, onSearch, onReset}) => {
    return(
        <Stack data-testid="formSearch" direction="row" spacing={1} justifyContent="center" alignItems="center" >
            <InputSearch  
                size='small' 
                onChange={onChange} 
                type='search'
                placeholder='Artists, songs or albums'/>
            <ButtonSearch 
                variant="contained" 
                onClick={onSearch} 
                startIcon={<SearchIcon />}
                >Search
            </ButtonSearch>
            <ButtonReset 
                variant="contained" 
                onClick={onReset} 
                >Reset
            </ButtonReset>
        </Stack>
    )
}

export default FormSearch;