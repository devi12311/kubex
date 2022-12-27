import '../css/styles.css';
import {useEffect, useState} from "react";
import service from '../apis/apis';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [name, setName] = useState('');
    const [publicRepos, setPublicRepos] = useState('');
    const [privateRepos, setPrivateRepos] = useState('');
    const [repos, setRepos] = useState([]);
    const token = localStorage.getItem('token');


    const uploadRepos = async (e) => {
        e.preventDefault();
        await service.saveRepos(token, repos).then(result => {
            alert(result.data.message);
        }).catch(err => alert(err.message));
    }


    useEffect(() => {
        service.getUser(token).then(response => {
            setUsername(response.data.login);
            setAvatarUrl(response.data.avatar_url);
            setName(response.data.name);
            setPublicRepos(response.data.public_repos);
            setPrivateRepos(response.data.owned_private_repos);
        })
        service.getRepos(token).then(response => {
            const mapped = response.data.map(repo => {
                return {
                    id: repo.id,
                    name: repo.name,
                    isPrivate: repo.private,
                    url: repo.url
                }
            })
            setRepos(mapped)
        })
    }, [])

    return <div className="dashboardDiv">
            <div className="card">
                <img src={avatarUrl} alt={name} style={{ width: 150, marginTop: 20 }}/>
                    <h1>{username}</h1>
                    <p className="title">{name}</p>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 20}}>
                        <div>
                            Private repos: {privateRepos}
                        </div>
                        <div>
                            Public repos: {publicRepos}
                        </div>
                    </div>
            </div>
            <div className='tableDiv'>
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Private</th>
                        <th>Url</th>
                        <th> <button onClick={uploadRepos}> Save Repos </button> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {repos.map(repo => {
                        return (<tr>
                                    <td>
                                        {repo.id}
                                    </td>
                                    <td>
                                        {repo.name}
                                    </td>
                                    <td>
                                        {repo.private ? 'Yes' : 'No'}
                                    </td>
                                    <td>
                                        {repo.url}
                                    </td>
                                </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>

}


export default Dashboard