const Container = (props) => {
    const classes = 'col-sm-8 col-md-6 col-xl-4' + props.className;
    const id = props.id;
    return (
        <div id={id} className='d-flex justify-content-center' >
            <div className={classes} >
                {props.children}
            </div>
        </div>
    );
}

export default Container;