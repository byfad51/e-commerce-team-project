import React, {useEffect} from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import "../../design/design.css"
import {useNavigate} from "react-router-dom";
const initialState = {
    loading: false,
    results: [],
    value: '',
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            //    console.log(action.selection)
            return { ...state, value: action.selection}
        default:
            throw new Error()
    }
}

function ProductSearch(props) {
    const [source, setSource] = React.useState([])
    const [autoData, setAutoData] = React.useState([])

    React.useEffect(() => {
        const newSource = autoData.map((item) => ({
            title: item,

        }))
        setSource(newSource)
    }, [autoData])



    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state
    useEffect(()=>{
        fetch(`http://localhost:8080/products/autocomplete?keyword=${value}`)
            .then(response => response.json())
            .then(data => {
                // Gelen String listesini burada kullanabilirsiniz
                setAutoData(data)
                // veya state'e atayabilirsiniz:
                // this.setState({ productList: data });
            })
            .catch(error => {
                console.error('İstek sırasında bir hata oluştu:', error);
            });

    }, [value])
    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.title)

            // Include the custom word entered by the user
            const customResult = { title: data.value }

            dispatch({
                type: 'FINISH_SEARCH',
                results: [customResult, ...source.filter(isMatch)],
            })
        }, 300)
    }, [source])


    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    const navigate = useNavigate();

    const handleRegister = (id) => {
        navigate("/mysearch?w="+id)
    }
    return (

        <Search size={"small"}
                loading={loading}
                placeholder="Search..."
                onResultSelect={(e, data) =>
                    dispatch({ type: 'UPDATE_SELECTION', selection: handleRegister(data.result.title) })

                }
                onSearchChange={(event, data) => {
                    handleSearchChange(event,data)
                }
                }
                results={results}
                value={value}
        />
    )
}

export default ProductSearch
