import React, {Component} from 'react';
import CalenderVerticalList from './components/CalenderVerticalList';
import {View, Dimensions, StyleSheet} from 'react-native';
import CalenderView from './components/CalenderView';
import CalenderModelGenerator from "./data/CalenderModelGenerator";
import EventsList from "./data/EventsList";
import {DataProvider} from "recyclerlistview";
import Header from "./components/Header";
import BaseReduxRootComponent from "../shared/components/BaseReduxRootComponent";
import Reducer from "./reducers/Reducer";
import Actions from "./actions/Actions";

export default class CalenderRoot extends BaseReduxRootComponent {
    constructor(props) {
        super(props);
        this.addReducers(Reducer);
        this.addActions(Actions);

        this._calenderGenerator = new CalenderModelGenerator();

        this.state = {
            dataProvider: new DataProvider(
                function rowHasChanged(r1, r2) {
                    return false; //r1.date.getTime() !== r2.date.getTime()
                }.bind(this)
            ).cloneWithRows(this._calenderGenerator.getModel()),
            eventsList: {}
        }
    }
    componentWillMount(){
        this.getAllActions().getCalenderEventsForDuration(null, null);
    }
    render() {
        const {dataProvider, eventsList} = this.state;
        return (
            <View style={styles.container}>
                <Header/>
                <View style={styles.calenderView}>
                    <CalenderView dataProvider={dataProvider} eventsList={eventsList}  />
                </View>
                <CalenderVerticalList dataProvider={dataProvider} eventsList={eventsList} style={styles.calenderVerticalList}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1
    },
    calenderView: {
        height: 5 * (Dimensions.get('window').width / 7)
    },
    calenderVerticalList: {
        flex: 1
    }
});

//
// import React, {Component} from 'react';
//
// export default class CalenderRoot extends Component {
//
// }
