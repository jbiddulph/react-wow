const initialState ={
    reports: [],
    reportsReading: [],
    reportsRead: []
}

const reports = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_REPORTS_FROM_SERVER':
            return{
                ...state,
                reports:action.payload,
                reportsReading:action.payload.filter(report => !report.saved),
                reportsRead: action.payload.filter(report => report.saved)
            };
        case 'ADD_REPORT':
            return{
                ...state,
                reports:[action.payload, ...state.reports],
                reportsReading:[action.payload, ... state.reportsReading]
            };
        case 'MARK_REPORT_AS_SAVED':
            return{
                ...state,
                reports: state.reports.map(report => {
                    if(report.name == action.payload.name){
                        return {...report, saved: true}
                    }
                    return report;
                })
            };
        default:
            return state;
    }
}

export default reports;
