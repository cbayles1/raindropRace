import HelpStuffing from '../(components)/HelpStuffing';

export default async function Help() {
    return (<div className='m-10'>
        <HelpStuffing showDesc={false}></HelpStuffing>
    </div>);
}