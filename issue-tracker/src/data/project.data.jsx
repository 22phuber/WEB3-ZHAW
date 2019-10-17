const PROJECT_DATA = [{
        id: 1,
        title: "project1",
        issues: [{
                id: 1,
                desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
                dueDate: "31.10.2019",
                priority: 1,
                done: false
            },
            {
                id: 2,
                desc: "eirmod tempor invidunt ut labore et dolore magna",
                dueDate: "05.11.2019",
                priority: 2,
                done: false
            }
        ]
    },
    {
        id: 2,
        title: "project2",
        issues: [{
                id: 1,
                desc: "Lorem ipsum dolor sit amet, sed.",
                dueDate: "05.11.2019",
                priority: 2,
                done: false
            },
            {
                id: 2,
                desc: "Do this and that, fix it asap!",
                dueDate: "24.12.2019",
                priority: 3,
                done: false
            },
            {
                id: 3,
                desc: "This is already done!",
                dueDate: "10.10.2019",
                priority: 2,
                done: true
            }
        ]
    }
]

export default PROJECT_DATA;