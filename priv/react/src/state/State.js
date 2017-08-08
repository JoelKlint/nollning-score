import { State, Effect, Actions } from 'jumpstate'
import R from 'ramda'
import { schema, normalize } from 'normalizr'

export default State({

    initial: {
        entities: {},
        current: {
            event: undefined,
            guild: undefined,
        }
    },

    updateEntities(state, entities) {
        return R.assocPath(
            ['entities'],
            R.mergeDeepRight(state.entities, entities),
            state,
        )
    },

    setCurrentEvent(state, event_id) {
        return R.assocPath(['current', 'event'], Number(event_id), state)
    },


    setCurrentGuild(state, guild_id) {
        return R.assocPath(['current', 'guild'], Number(guild_id), state)
    },

})

Effect('getAllEvents', () => {
    fetch("http://192.168.0.100:4000/api/events")
    .then(res => res.json())
    .then(res => {
        // Create schemas for normalize
        const category = new schema.Entity('categories')
        const event = new schema.Entity('events', {
            categories: [category]
        })

        // Normalize response
        const normalized = normalize(res.data, [event])
        Actions.updateEntities(normalized.entities)
    })
    .catch(err => console.error(err))
})

Effect('getEvent', (event_id) => {
    fetch(`http://192.168.0.100:4000/api/events/${event_id}`)
    .then(res => res.json())
    .then(res => {
        const category = new schema.Entity('categories')
        const event = new schema.Entity('events', {
            categories: [category]
        })

        const normalized = normalize(res.data, event)
        Actions.updateEntities(normalized.entities)
    })
    .catch(err => console.error(err))
})

Effect('getAllGuilds', () => {
    fetch(`http://192.168.0.100:4000/api/guilds`)
    .then(res => res.json())
    .then(res => {
        const guild = new schema.Entity('guilds')

        const normalized = normalize(res.data, [guild])
        Actions.updateEntities(normalized.entities)
    })
    .catch(err => console.error(err))
})

Effect('getAllCategoriesForEvent', (event_id) => {
    fetch(`http://192.168.0.100:4000/api/events/${event_id}/categories`)
    .then(res => res.json())
    .then(res => {
        const event = new schema.Entity('events')
        const category = new schema.Entity('categories', {
            event: event
        })

        const normalized = normalize(res.data, [category])
        Actions.updateEntities(normalized.entities)
    })
    .catch(err => console.error(err))
})

Effect('getAllScoresForEvent', (event_id) => {
    fetch(`http://192.168.0.100:4000/api/events/${event_id}/scores`)
    .then(res => res.json())
    .then(res => {
        const guild = new schema.Entity('guilds')
        const category = new schema.Entity('categories')
        const score = new schema.Entity('scores', {
            category: category,
            guild: guild,
        })

        const normalized = normalize(res.data, [score])
        Actions.updateEntities(normalized.entities)
    })
    .catch(err => console.error(err))
})

Effect('setScoreForCategoryAndGuild', (payload) => {
    fetch(`http://192.168.0.100:4000/api/categories/${payload.category_id}/scores`, 
        {
            method: 'post', 
            body: JSON.stringify({
                score: {
                    value: payload.value,
                    guild_id: payload.guild_id
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(res => {
            const guild = new schema.Entity('guilds')
            const category = new schema.Entity('categories')
            const score = new schema.Entity('scores', {
                category: category,
                guild: guild,
            })

            const normalized = normalize(res.data, score)
            Actions.updateEntities(normalized.entities)
        })
        .catch(err => console.error(err))
})

Effect('getResultsForEvent', (event_id) => {
    fetch(`http://192.168.0.100:4000/api/events/${event_id}/results`)
    .then(res => res.json())
    .then(res => {
        const guild = new schema.Entity('guilds')
        const event = new schema.Entity('events')
        const result = new schema.Entity('results', {
            guild: guild,
            event: event,
        })
        const normalized = normalize(res.data, [result])
        Actions.updateEntities(normalized.entities)
    })
    .catch(err => console.error(err))
})