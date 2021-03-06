package com.cs.data.core.nosql.mongodb;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.mongodb.NoSqlRepository;

/**
 * The Class MongoRepository.
 */
@Component
public class MongoRepository implements NoSqlRepository {

	/** The mongo template. */
	private MongoOperations mongoTemplate;

	private Update update;

	/**
	 * Instantiates a new mongo repository.
	 * 
	 * @param mongoTemplate
	 *            the mongo template
	 */
	@Autowired
	public MongoRepository(MongoOperations mongoTemplate, Update update) {
		this.mongoTemplate = mongoTemplate;
		this.update = update;
	}

	/*
	 * Saves given object to configured mongoDb database.
	 * 
	 * @see
	 * com.cs.data.core.nosql.NoSqlOperations#save(com.cs.data.core.GenericDomain
	 * )
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#save(com.cs.data.core.
	 * GenericDomain)
	 */
	@Override
	public boolean save(GenericDomain objectToInsert) {
		mongoTemplate.save(objectToInsert);

		return true;

	}

	/*
	 * Updates given object when configured mongoDb database.
	 * 
	 * @see com.cs.data.core.nosql.NoSqlOperations#update(java.lang.Object)
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cs.data.core.nosql.mongodb.NoSqlRepository#update(T)
	 */
	@Override
	public <T> T update(T query) {

		return null;
	}

	/*
	 * Deletes given object when configured mongoDb database.
	 * 
	 * @see com.cs.data.core.nosql.NoSqlOperations#delete(java.lang.Object)
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cs.data.core.nosql.mongodb.NoSqlRepository#delete(T)
	 */
	@Override
	public <T> boolean delete(T objectToDelete) {
		
		boolean response = true;
		try{
			mongoTemplate.remove(objectToDelete);
			
		}
		catch(Exception e){
			response = false; 
		}
		return response;

	}

	/*
	 * Gets object by given object key.
	 * 
	 * @see
	 * com.cs.data.core.nosql.NoSqlOperations#getObjectByKey(com.cs.data.core
	 * .GenericDomain, java.lang.Class)
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#getObjectByKey(com.cs.
	 * data.core.GenericDomain, java.lang.Class)
	 */
	@Override
	public <P> P getObjectByKey(GenericDomain key, Class<P> type) {
		try{
			return mongoTemplate.findById(key.getKey(), type);
		}
		catch(Throwable e){
			return null;
		}
	}

	/*
	 * gets object by given hash key and object key by type.
	 * 
	 * @see
	 * com.cs.data.core.nosql.NoSqlOperations#getObjectByKey(java.lang.String,
	 * java.lang.String, java.lang.Class)
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#getObjectByKey(java.lang
	 * .String, java.lang.String, java.lang.Class)
	 */
	@Override
	public <P> P getObjectByKey(String key, String objectKey, Class<P> class1) {
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#updateById(java.lang.String
	 * , java.lang.String, P, java.lang.Class)
	 */
	@Override
	public <T, P> boolean updateByIdPushIntoProperty(String id, String field, P valueToAdd,
			Class<T> type) {
		boolean response = true;
		try{

			mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(id)),
					update.push(field, valueToAdd), type);
		}
		catch(Exception e){
			response = false;
		}
		return response;


	}
	
	@Override
	public <T> boolean updateByIdSetProperty(String id, String field, String valueToAdd,
			Class<T> type) {
		boolean response = true;
		try{
			mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(id)),
					update.set(field, valueToAdd), type);
		}
		catch(Exception e){
			response = false;
		}
		return response;
	}


	/*
	 * Gets all documents of given collection.
	 * 
	 * @see com.cs.data.core.nosql.NoSqlOperations#findAll(java.lang.Class)
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#findAll(java.lang.Class)
	 */
	@Override
	public <T> List<T> findAll(Class<T> class1) {
		return mongoTemplate.findAll(class1);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#find(java.lang.String,
	 * java.lang.Class)
	 */
	@Override
	public <T> T find(String key, Class<T> class1) {
			try{
			return mongoTemplate.findById(key, class1);
		}
		catch(Throwable e){
			return null;
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#getObjectsBy(java.lang
	 * .String, java.lang.String, java.lang.Class)
	 */
	@Override
	public <T> List<T> getObjectsBy(String field, String value, Class<T> type) {
		try{
			return mongoTemplate.find(Query.query(Criteria.where(field).is(value)),
					type);
		}
		catch(Throwable e){
			return null;
		}

	}

	@Override
	public <T, P, Q> List<Q> getObjectForAndCriteria(String secondField,
			P secondFieldValue, String firstField,
			Collection<T> firstFieldValue, Class<Q> type) {
		try{
			return mongoTemplate.find(
				Query.query(Criteria.where(firstField).in(firstFieldValue)
						.and(secondField).is(secondFieldValue)), type);
		}
		catch(Throwable e){
			return null;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.core.nosql.mongodb.NoSqlRepository#getObjectByKey(java.lang
	 * .String, java.lang.Class)
	 */
	@Override
	public <T> T getObjectByKey(String id, Class<T> type) {
		try{
			return mongoTemplate.findById(id, type);
		}
		catch(Throwable e){
			return null;
		}
	}

	@Override
	public <P, T> boolean delete(String firstField, String secondField,
			List<P> groupId, List<T> possibleDeleteTypes,
			Class<? extends GenericDomain> type) {
		boolean response = true;
		try{
			mongoTemplate.remove(
					Query.query(Criteria.where(firstField).in(groupId)
							.and(secondField).in(possibleDeleteTypes)), type);
			
		}
		catch(Exception e){
			response = false; 
		}
		return response;

	}

}
