'use srict'

require('./prototypeExtensions')
var tools = require('./tools'),
	inspect = require('util').inspect
var Book = require('./book'),
	Part = require('./part'),
	Title = require('./title'),
	Chapter = require('./chapter'),
	Section = require('./section'),
	Subsection = require('./subsection'),
	Article = require('./article'),
	Li_1 = require('./li_1'),
	Li_a = require('./li_a'),
	Li_i = require('./li_i')

// AUXILIARY FUNCTIONS

function packStack(element, stack, vector) {
	if (! (element && stack && vector)) throw new Error('packStack: parameters missing')
	if (! (Array.isArray(stack) && Array.isArray(vector))) throw new Error('packStack: stack and vector must be arrays')
	var refType = element.getType()
	if (stack.length > 1) {
		if (typeof refType === 'undefined') throw new Error('packStack: element must supply a valid type')
		var waterline = Math.max(vector.indexOf(refType), vector.indexOf(stack[0].getType()) + 1)
		while (stack.length > 1 && vector.indexOf(stack.top().getType()) >= waterline) {
			var aux = stack.pop()
			stack.top().add(aux)
		}
	}
	stack.push(element)
}

// DISPATCHER

class Dispatcher {

	constructor(sectionsVector, articlesStructure, workflow, classesMap) {
		this.sectionsVector = sectionsVector
		this.articlesStructure = articlesStructure
		this.workflow = workflow
		this.workflowStatus = 'start'
		this.classesMap = classesMap
		this.isInArticle = false
		this.pending = ''
		this.doc = [] // Results in doc
	}

	parseLine(line) {
		if (! line || typeof line !== 'string') throw new Error('invalid line. exiting')
		line = line.clean()
		if (line.isEmpty()) return
		if (this.pending && this.pending.length > 0) {
			switch (this.pending) {
				case 'epigraph':
					this.doc.top().add(line)
					break
			}
			this.pending = undefined
			return
		}
		if (this.isInArticle) {
			var matchFound = false
			for (var i = 0; i < this.articlesStructure.vector.length; i++) {
				var tag = this.articlesStructure.vector[i]
				var clazz = this.classesMap[tag]
				if (! (clazz && clazz.matches && clazz.matches(line, this.lastTag))) continue
				matchFound = true
				var instance = new clazz(line)
				packStack(instance, this.doc, this.articlesStructure.vector)
				this.lastTag = instance.getNr()
				break
			}
			if (!matchFound) {
				var inComments = true
				var workflowVector = this.workflow['article']
				for (var i = 0; i < workflowVector.length; i++) {
					var tag = workflowVector[i]
					var clazz = this.classesMap[tag]
					if (! (clazz && clazz.matches && clazz.matches(line))) continue
					inComments = false
					break
				}
				while (this.doc.length > 1 && this.articlesStructure.vector.contains(this.doc.top().getType())) {
					var aux = this.doc.pop()
					this.doc.top().add(aux)
				}
				if (inComments) this.doc.top().add(line)
				else this.isInArticle = false
			}
		}
		if (! this.isInArticle) {
			var workflowVector = this.workflow[this.workflowStatus]
			for (var i = 0; i < workflowVector.length; i++) {
				var tag = workflowVector[i]
				var clazz = this.classesMap[tag]
				if (! (clazz && clazz.matches && clazz.matches(line))) continue
				var instance = new clazz(line)
				packStack(instance, this.doc, this.sectionsVector)
				this.pending = instance.isPending()
				this.isInArticle = instance.isInArticle()
				if (this.isInArticle) this.lastTag = 'start'
				break
			}
		}
	}

	getJSON() { return JSON.stringify(this.doc)}

}

module.exports = Dispatcher
