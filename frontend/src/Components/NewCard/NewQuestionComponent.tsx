import useValue from '../../Hooks/useValueHook';

function NewQuestionComponent() {

    const {value: term, updateValue: setTerm} = useValue('', 32, "Too Long Term");
    const {value: definition, updateValue: setDefinition} = useValue('', 256, "Too Long Definition");

    return (
        <div>
            <form>
                <input type='text' placeholder='Enter term' value={term} onChange={(e) => setTerm(e.target.value)}/>
                <input type='text' placeholder='Enter definition' value={definition} onChange={(e) => setDefinition(e.target.value)}/>
            </form>
        </div>
    )
}

export default NewQuestionComponent;