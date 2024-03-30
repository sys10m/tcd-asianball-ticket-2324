import { useContext } from 'react';
import NavigationContext from '../context/navigation';

export default function Link({ to, children }){
    const { navigate } = useContext(NavigationContext);

    const handleClick = (event) => {
        if (!(event.metakey || event.ctrlKey)){
            event.preventDefault();
            navigate(to)
        }
    }

    return (
        <a className='Link' href={to} onClick={handleClick}>
            {children}
        </a>
    )
}