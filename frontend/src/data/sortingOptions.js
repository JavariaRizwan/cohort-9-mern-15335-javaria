const sortingOptions=[
    {label: "New to Old" , value:"date-desc", compareFn:(a,b)=> new Date(b.createdAt) - new Date(a.createdAt)},
    {label: "Old to New" , value:"date-asc", compareFn:(a, b)=> new Date(a.createdAt) - new Date(b.createdAt)},
    { label: "(A – Z)", value: "title-asc",  compareFn:(a, b)=> a.title.localeCompare(b.title) },
    { label: "(Z – A)", value: "title-desc", compareFn:(a, b)=> b.title.localeCompare(a.title) },
    { label: "Pinned First", value: "pinned-first", icon: "📌", compareFn:(a, b)=> b.pinned - a.pinned }
]

export default sortingOptions;