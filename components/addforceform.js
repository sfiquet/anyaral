import { useState } from 'react'
import Link from 'next/link'
import { formatAbility } from '../lib/format'

function Label({label, htmlFor}){
  return (
    <label className="font-semibold" htmlFor={htmlFor}>
      {label}
    </label>
  )
}

function Input(props){
  return (
    <input {...props} />
  )
}

function Select({options, selected, onChange, ...props}){
  const optionItems = options.map(option => (
    <option value={option.value} key={option.value}>{option.text}</option>
  ))
  return (
    <select value={selected} onChange={e => onChange(e.target.value)} {...props}>
      {optionItems}
    </select>
  )
}

function DetailContent({children}){
  return (
    <div className="flex flex-col p-4 pt-0 border-t border-solid border-gray-300">
      {children}
    </div>
  )
}

function ForceDefinition({ races, budget, culture, setBudget, setCulture }){
  const cultureOptions = races
  .filter(race => race.culture.length > 0)
  .map(race => ({ value: race.code, text: `${race.culture} - ${race.theme}`}))

  return (
    <details className="box">
      <summary>
        <h2><span className='font-semibold'>Setup</span> - {budget} points, {culture}</h2>
      </summary>
      <div className="flex flex-col p-4 border-t border-solid border-gray-300 space-y-6">
        <div className="flex flex-col items-stretch space-y-1">
          <Label label="Name" htmlFor="name" />
          <Input id="name" type="text" name="name" />
        </div>
        <div className="flex flex-col items-start space-y-1">
          <Label label="Target points" htmlFor="points" />
          <Input id="points" type="number" name="points" required min="200" step="50" max="10000" value={budget} onChange={e => setBudget(e.target.value)} />
        </div>
        <div className="flex flex-col items-start space-y-1">
          <Label label="Culture" htmlFor="culture-select" />
          <Select id="culture-select" name="culture" required options={cultureOptions} selected={culture} onChange={setCulture} />
        </div>
      </div>
    </details>
  )
}

function maxQuantity(denizen, unusedBudget, currentQuantity){
  const available = unusedBudget + currentQuantity / denizen.cost_per * denizen.cost

  if (denizen.cost < 0) return 1
  else if (denizen.isUniqueCharacter) return available < denizen.cost ? 0 : 1
  else if (denizen.cost === 0) return 999
  else return Math.max(0, Math.floor(available / denizen.cost))
}

function DenizenShoppingRow({item, abilities, unusedBudget, shoppingList, setShoppingList}){
  const maxQty = maxQuantity(item, unusedBudget, shoppingList[item.code])
//  console.log(item)

  function handleQuantityChange(event){
//    console.log(shoppingList)
    setShoppingList({
      ...shoppingList,
      [event.target.name]: Number.parseInt(event.target.value, 10),
    })
  }

  return (
    <li className='border-t border-t-grey-300 py-2'>
      <div className='flex flex-wrap'>
        <h3 className='w-full sm:w-1/2 text-lg pb-2'>
          <Link href={`/denizens/${item.code}`}>
            <a>{item.name}</a>    
          </Link>
        </h3>
        <div className='w-full sm:w-1/2 flex space-x-1'>
          <div className='w-1/3'>{`${item.cost} pts`}</div>
          <div className='w-1/3 text-right'>
            <label className='sr-only' htmlFor={item.code}>{`${item.name} quantity`}</label>
            <Input type='number' id={item.code} name={item.code} min='0' max={maxQty} step={item.cost_per} value={shoppingList[item.code]} onChange={handleQuantityChange} />
            <div>{`max: ${maxQty}`}</div>
          </div>
          <div className='w-1/3 text-right'>{`${item.cost * shoppingList[item.code] / item.cost_per} pts`}</div>  
        </div>
      </div>
      <div className='flex space-x-1'>
        <DenizenTags tagArray={item.types} />
        <DenizenAbilities denizenAbilities={item.abilities} abilityRules={abilities} />
      </div>
    </li>
  )
}

function DenizenTags({tagArray}){
  const isElite = tagArray.includes('Elite')
  const isUnique = tagArray.includes('Unique')
  return (
    <div className='w-1/2 flex space-x-1'>
      { isElite ? <div className='border border-purple p-1'>Elite</div> : null }
      { isUnique ? <div className='border border-green p-1'>Unique</div> : null }
    </div>
  )
}

function DenizenAbilities({denizenAbilities, abilityRules}){
  const displayItems = denizenAbilities.reduce((acc, item) => {
    const rule = abilityRules.find(rule => rule.code === item[0])
    if (rule) {
      const newItem = {
        rule: rule,
        param1: item[1],
        param2: item[2],
      }
      acc.push(newItem)
    }
    return acc
  }, [])
  const abilityString = displayItems.map(ability => formatAbility(ability.rule, ability.param1, ability.param2)).join(', ')
  return (
    <div className='w-1/2 text-right'>{abilityString}</div>
  )
}

function DenizenShoppingList({items, abilities, unusedBudget, shoppingList, setShoppingList}){
  const rows = items.map(item => (
    <DenizenShoppingRow key={item.code} item={item} abilities={abilities} unusedBudget={unusedBudget} shoppingList={shoppingList} setShoppingList={setShoppingList} />
  ))
  return(
    <ul className='pt-2'>
      {rows}
    </ul>
  )
}

function TargetFullfillment({budget, spent}){
  return (
    <div>
      <div className='pt-4'>{`Points spent: ${spent}, remaining: ${budget -  spent}`}</div>
      <div>Elites: 0</div>
    </div>
  )
}

function ResultList({denizens, abilities, budget, usedBudget, shoppingList, setShoppingList}){
  return (<DenizenShoppingList items={denizens} abilities={abilities} unusedBudget={budget - usedBudget} shoppingList={shoppingList} setShoppingList={setShoppingList} />)
}

/*
function ResultTableRow({denizen, unusedBudget, shoppingList, setShoppingList}){
  const maxQty = maxQuantity(denizen, unusedBudget, shoppingList[denizen.code])
  const inputProps = {
    max: Number.isFinite(maxQty) ? maxQty : undefined,
  }

  function handleQuantityChange(event){
    const code = event.target.name.slice(3)
//    console.log(code)
    setShoppingList({
      ...shoppingList,
      [code]: Number.parseInt(event.target.value, 10),
    })
  }

  return (
    <tr>
      <th scope='row' className='px-2'>
        <Link href={`/denizens/${denizen.code}`}>
          <a>{denizen.name}</a>
        </Link>
      </th>
      <td className='px-2 text-right'>
        {`${denizen.cost} pts`}
      </td>
      <td className='px-2 text-right'>{maxQty}</td>
      <td>
        <Input type='number' name={`td-${denizen.code}`} min='0' {...inputProps} value={shoppingList[denizen.code]} onChange={handleQuantityChange} />
      </td>
    </tr>
  )
}

function ResultTable({denizens, budget, usedBudget, shoppingList, setShoppingList}){
  const headers = ['Name', 'Cost', 'Max Fit ', 'Quantity']
  const colHeaders = headers.map(item => <th scope='col' key={item}>{item}</th>)
  const rows = denizens.map(denizen => <ResultTableRow key={denizen.code} denizen={denizen} unusedBudget={budget - usedBudget} shoppingList={shoppingList} setShoppingList={setShoppingList} />)

  return (
    <table>
      <caption>Denizens</caption>
      <tr>
        {colHeaders}
      </tr>
      {rows}
    </table>
  )
}
*/

function SearchBar(){
  return null
}

function ForceList({budget, culture, denizens, abilities, shoppingList, setShoppingList}){
  const spent = totalSpent(denizens, shoppingList)
  return (
    <>
    <details className="box">
      <summary>
        <h2>Composition</h2>
      </summary>
      <DetailContent>
        <TargetFullfillment budget={budget} spent={spent} />
        <SearchBar />
        <ResultList denizens={denizens} abilities={abilities} budget={budget} usedBudget={spent} shoppingList={shoppingList} setShoppingList={setShoppingList} />
      </DetailContent>
    </details>
    </>
  )
}

function ForceNotes(){
  return (
    <details className="box">
      <summary>
        <h2>Notes</h2>
      </summary>
      no notes
    </details>
  )
}

function totalSpent(denizens, shoppingList){
  return denizens.reduce((acc, denizen) => {
    return acc + denizen.cost * shoppingList[denizen.code]
  }, 0)
}

export default function AddForceForm(props){
  const [budget, setBudget] = useState(200)
  const [culture, setCulture] = useState('empire_core')
  const initialQuantities = props.creatures.reduce((acc, item) => {
    acc[item.code] = 0
    return acc
   }, {})
  const [shoppingList, setShoppingList] = useState(initialQuantities)
//  console.log(shoppingList)

  return (
    <form className="space-y-2">
      <ForceDefinition races={props.races} budget={budget} culture={culture} setBudget={setBudget} setCulture={setCulture} />
      <ForceList budget={budget} culture={culture} denizens={props.creatures} abilities={props.abilities} shoppingList={shoppingList} setShoppingList={setShoppingList} />
      <ForceNotes />

      <button className="btn-action">Add</button>
    </form>
  )
}
