import {useState} from 'react'
import elements from './elements.json'
import './styles.scss'

interface Element {
	id: number,
	symbol: string,
	name: string,
	atomicMass: number
	atomicWeight: Array<number>
	family: string
	position: Array<number>
	formula: Array<string>
	image: string
	desc: string
  uses: string
}

const ElementModal = (props: any) =>{
  return (
		<div className="popup">
			<div className="popup-inner">
				{props.children}
			</div>
		</div>
	)
}

function getatomic(weigth: Array<number>): HTMLUListElement | any{
	return (
		weigth.forEach(weigth => {
			return <li>{weigth}</li> 
		})
	)
}

export const PeriodicTable = () => {
	const [showModal, setShowModal] = useState(false)
	const [data, setData] = useState({
    id: 1,
    symbol: "H",
    name: "Hidrogênio",
    atomicMass: 1.008,
    atomicWeight: [ 1 ],
    family: "Não_Metal",
    position: [ 1, 1 ],
    formula: [ "H" ],
		image: "",
		desc: "",
    uses: ""
  })

	function openModal() {
    setShowModal(true)
  }
	function closeModal() {setShowModal(false)}


	const families = [
		{tag:"Não_Metal", name: "Não Metais"},
		{tag:"Gás_Nobre", name: "Gases Nobre"},
		{tag:"Metal_Alcalino", name: "Metais Alcalinos"},
		{tag:"Metal_Alcalino-terroso", name: "Metais Alcalino-terrosos"},
		{tag:"Metal_de_Transição", name: "Metais de Transição"},
		{tag:"Semimetal", name: "Semimetais"},
		{tag:"Outros_Metais", name: "Outros Metais"},
		{tag:"Lantanídeos", name: "Lantanídeos"},
		{tag:"Actinídeos", name: "Actinídeos"},
		{tag:"Halogênio", name: "Halogênios"}
	]


	return (
		<div className="page-periodicTable">
			<div className="wrapper">
				<div className="periodic-table">

					{elements.map((element: Element) => {
						return (
							<div className={`element ${element.family} c${element.position[0]} r${element.position[1]}`}>
								<input className="activate" type="radio" name="elements" onClick={() => {
									setData(element);
									openModal();
								}}/>
								<input className="deactivate" type="radio" name="elements" onClick={closeModal}/>
								<div className="overlay"></div>
								<div className="square">
									<div className="atomic-number">{element.id}</div>
									<div className="label">
										<div className="symbol">{element.symbol}</div>
										<div className="name">{element.name}</div>
									</div>
									<div className="atomic-mass">{element.atomicMass}</div>
									<ul className="atomic-weight">
										{getatomic(element.atomicWeight)}
									</ul>
								</div>
							</div>
						)
					})}

					<div className="placeholder lanthanoid c3 r6">
							<div className="square">57-71</div>
					</div>
					<div className="placeholder actinoid c3 r7">
							<div className="square">89-103</div>
					</div>
					<div className="gap c3 r8"></div>
					<div className="key">
						{families.map( (family) => {
							return(
								<div className="row">
									<label className={family.tag} htmlFor={family.tag}>{family.name}</label>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			{
				showModal 
				? (
					<ElementModal>
						<div className="content-img">
							<img
								src={data.image} 
							  alt={data.name}
              />
						</div>
						<div className="content-text">
							<h4 className={data.family}>{data.name} - {data.symbol}</h4>
							<h5 className={data.family}>Família: {data.family.replace("_"," ")}</h5>
							<p>{data.desc}</p>
              <p>{data.uses}</p>
						</div>
					</ElementModal>
				) : null
			}
		</div>
	)
}