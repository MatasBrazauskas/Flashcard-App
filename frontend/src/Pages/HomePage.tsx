function MainPage(){

    return (<>
        <div>{localStorage.getItem('name')}</div>
    </>);
}

export default MainPage;