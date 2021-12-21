const CourseComponent = (props) => {
    console.log(props);


    return (
        <div className="main--flex">
            <div>
                <h3 className="course--detail--title">Course</h3>
                <h4>Build a Basic Bookcase</h4>
                <p></p>
                <p></p>
            </div>
            <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>14 hours</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                    <li>1/2 x 3/4 inch parting strip</li>
                    <li>1 x 2 common pine</li>
                    <li>1 x 4 common pine</li>
                    <li>1 x 10 common pine</li>
                    <li>1/4 inch thick lauan plywood</li>
                    <li>Finishing Nails</li>
                    <li>Sandpaper</li>
                    <li>Wood Glue</li>
                    <li>Wood Filler</li>
                    <li>Minwax Oil Based Polyurethane</li>
                </ul>
            </div>
        </div>
    );
}

export default CourseComponent;
