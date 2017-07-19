var React = require('react');
var { Repeat } = require('Immutable');

class ReactTypeInAndOut extends React.Component {

    constructor (props) {
        super(props);

        var words = props.words;

        words = words.reduce((acc, word) => {

            // include empty string as start/end
            word = [''].concat(word.split(''));

            var forwards = word.map((lc, lIdx, lw) => {
                return lw.slice(0, lIdx + 1).join('');
            });

            var backwards = forwards.slice(0, -1).reverse();

            return acc.concat(forwards, backwards);

        }, []);

        this.state = {
            words: words
        };
    }

    componentDidMount () {
        var words = this.state.words;
        var start = 0;

        var running = setInterval(() => {

            this.setState({
                currentWord: words[start]
            });

            start = (start + 1) % words.length;

        }, this.props.speed);
    }

    render () {
        var currentWord = this.state.currentWord;
        return <div>{currentWord}</div>;
    }
}

ReactTypeInAndOut.propTypes = {
    words: React.PropTypes.arrayOf(React.PropTypes.string),
    speed: React.PropTypes.number
};

ReactTypeInAndOut.defaultProps = {
    speed: 200
};

export default ReactTypeInAndOut;
