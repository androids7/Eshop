package org.csu.eshop.web;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.csu.eshop.domain.Category;
import org.csu.eshop.domain.Customer;
import org.csu.eshop.domain.Log;
import org.csu.eshop.domain.Product;
import org.csu.eshop.domain.SaveItem;
import org.csu.eshop.service.CustomerService;
import org.csu.eshop.service.LogService;
import org.csu.eshop.service.ProductService;

import com.opensymphony.xwork2.ActionSupport;


public class CustomerAction extends ActionSupport{

    private CustomerService customerService;
    private Customer customer;
    private LogService logService;
    
    
    
    private List<Category> categoryList;
    private ProductService productService;
    
    
    public List<Category> getCategoryList() {
		return categoryList;
	}

	public void setCategoryList(List<Category> categoryList) {
		this.categoryList = categoryList;
	}

	public CustomerService getCustomerService() {
		return customerService;
	}

	public void setCustomerService(CustomerService customerService) {
		this.customerService = customerService;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	/**
     * ������ҳ
     * @return
     */
    public String main() {
    	productService=new ProductService();
    	categoryList=productService.getParentCategoryList();
    	List<Category> childCategoryList=new ArrayList<Category>();
    	for(int i=0;i<categoryList.size();i++){
    		childCategoryList=productService.getChildCategoryList(categoryList.get(i).getCategoryId());
    		for(int j=0;j<childCategoryList.size();j++){
    			categoryList.get(i).addCategory(childCategoryList.get(j));
    		}
    	}
        return SUCCESS;
    }
    
    

    /**
     * ���û��������ʱ�����¼����
     * @return
     */
    public String intoLogin() {
        
    	return this.SUCCESS;
    }

    /**
     * �û��Ѿ������������ˣ����û���д
     * ���û��������룬������밴ťʱ�����˷���
     * ����û�����������Ϊ��Ҫ����ʾ
     * �����Ϊ�գ��������ݿ���ҿ���û��ƥ����
     * ���û�еĻ���ʾ�û���������
     * ����еĻ�����������
     * @return
     */
    public String login() {
    	productService=new ProductService();
    	categoryList=productService.getParentCategoryList();
    	List<Category> childCategoryList=new ArrayList<Category>();
    	for(int i=0;i<categoryList.size();i++){
    		childCategoryList=productService.getChildCategoryList(categoryList.get(i).getCategoryId());
    		for(int j=0;j<childCategoryList.size();j++){
    			categoryList.get(i).addCategory(childCategoryList.get(j));
    		}
    	}
    	HttpServletRequest req = ServletActionContext.getRequest();
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        HttpSession session = req.getSession();
       
        CustomerService customerService = new CustomerService();
        Customer account = customerService.getCustomer(username,password);
        if(account!=null){
        	session.setAttribute("account", account);
            Log log=new Log();
            Calendar c = Calendar.getInstance();// ���Զ�ÿ��ʱ���򵥶��޸�
            log.setUsername(username);
            log.setTime(c.getTime().toString());
            log.setEvent("�û���¼��");
            logService=new LogService();
            logService.insertLog(log);
        	return this.SUCCESS;	
        }
        else return  this.ERROR;
    }

    /**
     * ��ʱ�û��Ѿ������ˣ���ҳ������϶ˣ�����ֵǳ�
     * ����û�����ǳ����ѷ���session��customer�����Ƴ�
     * session.remove("account");
     * ͬʱ���һ���µ�account
     * account = new Account();
     * session.put("account", account);
     * ����������
     * @return
     */
    public String logout() {
    	productService=new ProductService();
    	categoryList=productService.getParentCategoryList();
    	List<Category> childCategoryList=new ArrayList<Category>();
    	for(int i=0;i<categoryList.size();i++){
    		childCategoryList=productService.getChildCategoryList(categoryList.get(i).getCategoryId());
    		for(int j=0;j<childCategoryList.size();j++){
    			categoryList.get(i).addCategory(childCategoryList.get(j));
    		}
    	}
    	HttpSession session = ServletActionContext.getRequest().getSession();
        Customer account = (Customer) session.getAttribute("account");
        if(account!=null){
        	Log log=new Log();
        	Calendar c = Calendar.getInstance();// ���Զ�ÿ��ʱ���򵥶��޸�
        	log.setUsername(account.getUsername());
        	log.setTime(c.getTime().toString());
        	log.setEvent("�û��˳���");
        	logService=new LogService();
            logService.insertLog(log);
        	session.removeAttribute("account");
        }
        return this.SUCCESS;
    }

    /**
     * ���û�����ʱ��ҳ�����˻��У��ҵ��˻���
     * ���û�����ҵ��˻��ᴥ���÷�������ʱҳ����ת��
     *  �˻������е��û���Ϣ��ϸҳ��
     * @return
     */
    public String viewMyAccount() {
    	 HttpSession session = ServletActionContext.getRequest().getSession();
         if(session.getAttribute("account")==null)
         	return this.ERROR;
         else return this.SUCCESS;
    }

    /**
     * ��ʱ�û��Ѿ�����������ģ�������л���
     * ���ҵĹ�ע���ҵ���ϸ��Ϣ���ҵĶ�����
     * ���û�����ҵĹ�עʱ��������¼�
     * ������������û����Բ鿴�Ѿ���ע������Ʒ
     * @return
     */
    public String viewMySaveItem() {
    	 HttpServletRequest req = ServletActionContext.getRequest();
         HttpSession session = req.getSession();
         Customer account = (Customer) session.getAttribute("account");
         if(account==null)
         	return this.ERROR;
         CustomerService customerService = new CustomerService();
         List<SaveItem> saveItemList = customerService.getSaveItemList(account.getUsername());
         List<Product> saveProductList = new ArrayList<Product>();
         ProductService productService = new ProductService();
         for(int i=0;i<saveItemList.size();i++){
         	Product  temp = productService.getProduct(saveItemList.get(i).getProducId());
         	if(temp!=null)
         		saveProductList.add(temp);
         }
         session.setAttribute("saveProductList", saveProductList);
         return this.SUCCESS;
    }
    /*
     * ���ɾ����Ӧ�Ĺ�ע��Ʒʱ�����˲���
     * */
    public String deleteMySaveItem(){
    	HttpServletRequest req = ServletActionContext.getRequest();
        HttpSession session = req.getSession();
        int index = Integer.parseInt(req.getParameter("index"));
        Customer account = (Customer) session.getAttribute("account");
        CustomerService customerService = new CustomerService();
        List<SaveItem> saveItemList = customerService.getSaveItemList(account.getUsername());
        customerService.delectSaveItem(saveItemList.get(index).getSaveItemId());
        saveItemList = customerService.getSaveItemList(account.getUsername());
        List<Product> saveProductList = new ArrayList<Product>();
        ProductService productService = new ProductService();
        for(int i=0;i<saveItemList.size();i++){
        	Product  temp = productService.getProduct(saveItemList.get(i).getProducId());
        	if(temp!=null){
        		saveProductList.add(temp);
        	}
        }
        session.setAttribute("saveProductList", saveProductList);
    	return this.SUCCESS;
    }
    /**
     * ��ʱ�û��Ѿ������ҵ��˻���ϸҳ�棬�����ҳ���û������޸��Լ�����Ϣ
     * ҳ��Ͷ˻���һ���ύ��ť�����û�����˰�ť�������ú���
     * ���ڸú������޸����ݿ����˻�����Ϣ
     * @return
     */
    public String changeInfo() {
    	HttpServletRequest req = ServletActionContext.getRequest();
    	HttpSession session = req.getSession();
    	String username = req.getParameter("username");
    	String  address = req.getParameter("address");
    	int integrate = ((Customer) session.getAttribute("account")).getIntegrate();
    	String mobile = req.getParameter("mobile");
    	String password = ((Customer) session.getAttribute("account")).getPassword();
    	Customer account = new Customer();
    	account.setUsername(username);
    	account.setAddress(address);
    	account.setIntegrate(integrate);
    	account.setMobile(mobile);
    	account.setPassword(password);
    	CustomerService customerService = new CustomerService();
    	customerService.updateCustomer(account);
    	session.setAttribute("account", account);
        return this.SUCCESS;
    }
    /*
     * ��������
     * */
    public String passwordReset(){
    	HttpServletRequest req = ServletActionContext.getRequest();
    	String newpassword = req.getParameter("newpasswrd");
    	String password = req.getParameter("password");
    	if(password==null)
    		return this.ERROR;
    	String renewpassword = req.getParameter("renewpassword");
    	if(!newpassword.equals(renewpassword)){
    		return this.ERROR;
    	}
    	HttpSession session = req.getSession();
    	Customer account  = (Customer) session.getAttribute("account");
    	account.setPassword(newpassword);
    	CustomerService customerService = new CustomerService();
    	customerService.updateCustomer(account);
    	return this.SUCCESS;
    }
    /**
     * ���û��������ע��ʱ�����˺���
     * ��ʱҳ����ת��ע��ҳ��
     * @return
     */
    public String register() {
        
    	return this.SUCCESS;
    }

    /**
     * ��ʱ�û��Ѿ�������ע���ҳ�棬
     * ���û���д����Ϣ������ύ��ťʱ
     * �����˺�����Ҫ����һЩ�ж�
     * �����û�������ʱ���ص���ҳ��
     * ����ע��ɹ�����¼���û��������ص�������
     * @return
     */
    public String newAccount() {
        
    	HttpServletRequest req = ServletActionContext.getRequest();
    	String username = req.getParameter("username");
    	CustomerService customerService = new CustomerService();
    	if(customerService.getCustomer(username)!=null){
    		return this.ERROR;
    	}
    	String password = req.getParameter("password");
    	String  repassword = req.getParameter("repassword");
    	if(!password.equals(repassword))
    		return this.ERROR;
    	String mobile = req.getParameter("mobile");
    	String address = req.getParameter("address");
    	
    	int integrate = 0;
    	Customer account  = new Customer();
    	account.setAddress(address);
    	account.setIntegrate(integrate);
    	account.setMobile(mobile);
    	account.setPassword(password);
    	account.setUsername(username);
    	HttpSession session = req.getSession();
    	session.setAttribute("account", account);
    	customerService.insertCusomer(account);
        return this.SUCCESS;
    }

}