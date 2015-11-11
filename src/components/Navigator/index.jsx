import { TransitionMotion } from 'react-motion';
import PureRenderMixin      from 'react-addons-pure-render-mixin';
import React                from 'react';
import { bindListener }     from 'utils';
//DEBUG
let Provider, LogMonitor;
if(__DEBUG__) {
    const reactRedux = require("react-redux");
    Provider = reactRedux.Provider;
    LogMonitor = require("components/LogMonitor");
}
//
export default React.createClass({
    mixins: [PureRenderMixin],
    elementCache: {},

    getInitialState() { return { elements: {}, debug: false }; },

    componentDidMount() {
        this.setState({elements: this.props.initialState.current});
        bindListener(this.props.listener, state => {
            this.setState({elements: state.current, debug: state.debug});
        });
    },

    getStyles() {
        try {
            let configs = {};
            Object.keys(this.state.elements).forEach(key => {
                configs[key] = this.props.sceneConfigurations[key].Styles(this.state.elements[key]);
            });
            return configs;
        } catch(ex) {
            throw new Error(ex);
        }
    },

    willEnter(key) {
        /* Cache the element so it can be refrenced instead of recreated on every loop */
        this.elementCache[key] = this.props.sceneConfigurations[key].VM();
        return this.props.sceneConfigurations[key].Enter;
    },

    willLeave(key, style, value, currentSpeed) {
        /* Remove cache when the elment is done transitioning */
        const cS = currentSpeed[key];
        const sC = this.props.sceneConfigurations[key].Leave;
        if(cS.x.val == sC.x.val &&
            cS.y.val == sC.y.val &&
            cS.opacity.val == sC.opacity.val) delete this.elementCache[key];
        return sC;
    },

    sceneObj(iS) {
        return (key) => {
            const {...style} = iS[key];
            const s = {willChange: "transform", opacity:style.opacity/100, WebkitTransform:"translate("+style.x+"vw,"+style.y+"vh)", transform: "translate("+style.x+"vw,"+style.y+"vh)", zIndex: style.z};

            return (
                <div key={key} style={s}>
                    {(this.elementCache[key]) ? this.elementCache[key] : this.props.sceneConfigurations[key].VM(this.nav(this))}
                </div>
            );
        };
    },

    interpolatedStyles(iS) {
        return (
            <div>
                {Object.keys(iS).map(this.sceneObj(iS))}
                {(__DEBUG__ && this.state.debug) ? (<div style={{position:"absolute",top:"0",right:"0",zIndex:"10",width:"30vw",height:"100vw"}}><Provider store={this.props.store} key="provider"><LogMonitor /></Provider></div>) : []}
            </div>
        );
    },

    render() {
        return (
            <TransitionMotion
              styles={this.getStyles()}
              willEnter={this.willEnter}
              willLeave={this.willLeave}>
                {interpolatedStyles => this.interpolatedStyles(interpolatedStyles)}
            </TransitionMotion>
        );
    }

});
